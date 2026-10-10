import { after, type NextRequest } from "next/server";
import { requireWebPermission } from "@/lib/server/auth/authorize";
import {
  ensureServerDatabaseInitialized,
  getServerDatabase,
} from "@/lib/server/db";
import { allocateFund } from "@/lib/server/finance";
import {
  noStoreJson,
  readJsonBody,
  toApiErrorResponse,
} from "@/lib/server/http/api-response";
import { assertSameOriginMutation } from "@/lib/server/http/request-security";
import { dispatchNotificationsQuietly } from "@/lib/server/notifications";

export const runtime = "nodejs";

/** Cerminan `desktop_allocate_fund` (PRD F-17, v2.3a). */
export async function POST(request: NextRequest) {
  try {
    assertSameOriginMutation(request);
    await ensureServerDatabaseInitialized();
    const operator = await requireWebPermission(request, "finance.manage");
    const body = await readJsonBody<Record<string, unknown>>(request);
    const result = await allocateFund(getServerDatabase(), body, operator);
    // Order siap kirim: grup Production diberi tahu sesudah respons (v3.3).
    after(() => dispatchNotificationsQuietly(getServerDatabase()));
    return noStoreJson({ sukses: true, ...result });
  } catch (error) {
    return toApiErrorResponse(error);
  }
}
