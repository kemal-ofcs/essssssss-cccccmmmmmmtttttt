/**
 * Pembaca literal string Rust untuk gerbang yang memeriksa SQL (`audit-sql.ts`).
 *
 * MENGAPA INI BUKAN SEBUAH REGEX. Gerbang SQL dulu membaca `r#"…"#` SAJA,
 * sehingga setiap query yang ditulis sebagai string biasa tidak terlihat sama
 * sekali — termasuk seluruh query `SNAPSHOT_SOURCES` di `turso.rs`, yang
 * berbentuk `sql: "SELECT * FROM …;"`. Gerbangnya melaporkan lulus sambil
 * tidak pernah membaca satu pun di antaranya: bentuk lulus palsu yang sama
 * persis dengan `schema-audit.ts` lama yang melaporkan "100% KONSISTEN" atas
 * nol tabel.
 *
 * MENGAPA MENAMBAHKAN REGEX KUTIP BIASA SAJA TIDAK CUKUP. Memasangkan `"`
 * secara buta akan desinkron pada tiga hal yang semuanya ada di repo ini, dan
 * sekali desinkron seluruh sisa berkas terbaca salah:
 *
 *   1. badan `r#"…"#` yang memuat `"` di dalamnya;
 *   2. komentar `//` dan blok komentar yang memuat kutip;
 *   3. literal char `'"'` — `turso.rs` memakai `trim_matches('"')`.
 *
 * Karena itu berkasnya ditelusuri sekali per karakter. Komentar dan literal
 * char dilewati sebagai bukan-literal, sehingga posisi tiap temuan tetap sahih
 * untuk penomoran baris maupun untuk pelipatan query yang dirakit bertahap.
 *
 * SATU SALINAN, BUKAN DUA. Fungsi ini sengaja hidup di `scripts/lib/` alih-alih
 * disalin ke masing-masing gerbang: dua salinan akan drift, dan drift pada
 * pembaca literal berarti salah satu gerbang diam-diam berhenti melihat
 * sebagian kodenya — persis cacat yang modul ini ada untuk memperbaikinya.
 */

export interface LiteralRust {
	/** Badan literal; escape `\n`, `\t`, `\"`, `\\` sudah dipulihkan. */
	isi: string;
	/** Posisi karakter pembuka literal di dalam sumber aslinya. */
	index: number;
	/** Literal mentah `r#"…"#`, yang di Rust tidak mengenal escape. */
	mentah: boolean;
}

export interface OpsiPetikRust {
	/**
	 * Buang literal yang berada di dalam `#[cfg(test)]`.
	 *
	 * Berbeda dari TypeScript yang menaruh tesnya di berkas `*.test.ts`
	 * tersendiri, tes Rust hidup di berkas yang sama dengan kode produksi.
	 * `audit-sql` menyalakannya: SQL di dalam tes berjalan di atas tabel
	 * fixture yang dibuat saat runtime, sehingga mem-`prepare`-nya terhadap
	 * skema nyata hanya menghasilkan "no such table" atas kode yang benar —
	 * dan `cargo test` memang menjalankan query itu sungguhan.
	 */
	tanpaModulTes?: boolean;
}

/** Pulihkan escape Rust yang relevan untuk SQL. */
function lepasEscape(teks: string): string {
	return teks.replace(/\\(["'\\nrt0])/g, (_, ch: string) => {
		if (ch === "n") return "\n";
		if (ch === "r") return "\r";
		if (ch === "t") return "\t";
		if (ch === "0") return "\0";
		return ch;
	});
}

export function petikRust(
	sumber: string,
	opsi: OpsiPetikRust = {},
): LiteralRust[] {
	const hasil: LiteralRust[] = [];
	const kurung: Array<{ pos: number; buka: boolean }> = [];
	const cfgTes: number[] = [];
	const n = sumber.length;
	let i = 0;

	while (i < n) {
		const c = sumber[i];

		if (c === "/" && sumber[i + 1] === "/") {
			while (i < n && sumber[i] !== "\n") i++;
			continue;
		}
		if (c === "#" && sumber.startsWith("#[cfg(test)]", i)) {
			cfgTes.push(i);
			i += "#[cfg(test)]".length;
			continue;
		}
		// Komentar blok Rust boleh bersarang.
		if (c === "/" && sumber[i + 1] === "*") {
			let dalam = 1;
			i += 2;
			while (i < n && dalam > 0) {
				if (sumber[i] === "/" && sumber[i + 1] === "*") {
					dalam++;
					i += 2;
				} else if (sumber[i] === "*" && sumber[i + 1] === "/") {
					dalam--;
					i += 2;
				} else i++;
			}
			continue;
		}
		// Raw string: r"…", r#"…"#, r##"…"##, dan seterusnya.
		if (c === "r") {
			let j = i + 1;
			let pagar = 0;
			while (sumber[j] === "#") {
				pagar++;
				j++;
			}
			if (sumber[j] === '"') {
				const mulai = j + 1;
				const tutup = `"${"#".repeat(pagar)}`;
				const akhir = sumber.indexOf(tutup, mulai);
				if (akhir !== -1) {
					hasil.push({
						isi: sumber.slice(mulai, akhir),
						index: i,
						mentah: true,
					});
					i = akhir + tutup.length;
					continue;
				}
			}
		}
		// Literal char: '"' dan '\\' ikut, tetapi lifetime `'a` tidak.
		if (c === "'") {
			if (sumber[i + 1] === "\\") {
				let j = i + 2;
				while (j < n && sumber[j] !== "'") j++;
				i = j + 1;
				continue;
			}
			if (sumber[i + 2] === "'") {
				i += 3;
				continue;
			}
		}
		if (c === '"') {
			const mulai = i + 1;
			let j = mulai;
			while (j < n) {
				if (sumber[j] === "\\") {
					j += 2;
					continue;
				}
				if (sumber[j] === '"') break;
				j++;
			}
			if (j < n) {
				hasil.push({
					isi: lepasEscape(sumber.slice(mulai, j)),
					index: i,
					mentah: false,
				});
				i = j + 1;
				continue;
			}
			break;
		}
		if (c === "{" || c === "}") kurung.push({ pos: i, buka: c === "{" });
		i++;
	}

	if (!opsi.tanpaModulTes) return hasil;

	// Rentang tiap modul/fungsi `#[cfg(test)]`: dari kurung buka pertama
	// sesudahnya sampai pasangannya. Kurung di dalam string dan komentar tidak
	// pernah masuk daftar ini karena keduanya sudah dilewati di atas.
	//
	// Pencocokan kurung, BUKAN "semua yang ada sesudah `#[cfg(test)]` adalah
	// tes". Jalan pintas itu terbukti salah di proyek asal: dua modulnya memuat
	// kode PRODUKSI sesudah modul tesnya, sehingga menyembunyikannya justru
	// menggali lubang cakupan baru.
	const rentangTes: Array<[number, number]> = [];
	for (const awal of cfgTes) {
		const mulaiIdx = kurung.findIndex((k) => k.pos > awal && k.buka);
		if (mulaiIdx === -1) continue;
		let dalam = 0;
		for (let k = mulaiIdx; k < kurung.length; k++) {
			dalam += kurung[k]?.buka ? 1 : -1;
			if (dalam === 0) {
				rentangTes.push([
					kurung[mulaiIdx]?.pos ?? 0,
					kurung[k]?.pos ?? sumber.length,
				]);
				break;
			}
		}
	}

	return hasil.filter(
		(literal) =>
			!rentangTes.some(([a, b]) => literal.index > a && literal.index < b),
	);
}
