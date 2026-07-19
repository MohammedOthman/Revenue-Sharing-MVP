#!/usr/bin/env bash
# Reven Phase-1 smoke test: drives the MVP definition-of-done end to end and
# asserts the invariants. Re-runnable (each run uses a fresh tenant).
#
# Usage: BASE=http://127.0.0.1:5000 bash scripts/smoke-reven.sh
# Requires the server running with a reachable database. Exits non-zero on failure.
set -euo pipefail
BASE="${BASE:-http://127.0.0.1:5057}"
API="$BASE/api/reven"
SFX="$(date +%s)$RANDOM"

jget(){ node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{let o=JSON.parse(s);let v=process.argv[1].split(".").reduce((a,k)=>a&&a[k],o);console.log(typeof v==="object"?JSON.stringify(v):v)})' "$1"; }
fail(){ echo "SMOKE FAIL: $1"; exit 1; }
assert(){ [ "$1" = "$2" ] || fail "expected '$2' got '$1' ($3)"; }

TOK=$(curl -s -X POST "$API/auth/onboard" -H 'Content-Type: application/json' \
  -d "{\"tenantName\":\"Smoke $SFX\",\"slug\":\"smoke-$SFX\",\"country\":\"SA\",\"email\":\"o$SFX@smoke.sa\",\"password\":\"Passw0rd!\",\"fullName\":\"Smoke Owner\"}" | jget token)
[ -n "$TOK" ] || fail "onboard returned no token"
H="Authorization: Bearer $TOK"

PID=$(curl -s -X POST "$API/partners" -H "$H" -H 'Content-Type: application/json' \
  -d "{\"displayName\":\"Smoke Partner\",\"domain\":\"p$SFX.sa\",\"taxId\":\"CR$SFX\",\"partnerType\":\"reseller\"}" | jget partner.id)
AGID=$(curl -s -X POST "$API/agreements" -H "$H" -H 'Content-Type: application/json' \
  -d "{\"name\":\"Smoke Agr\",\"tenantPartnerId\":\"$PID\",\"shareRate\":0.10,\"whtRate\":0.05,\"protectionWindowDays\":90}" | jget agreement.id)
CL=$(curl -s -X POST "$API/claims" -H "$H" -H 'Content-Type: application/json' \
  -d "{\"tenantPartnerId\":\"$PID\",\"agreementId\":\"$AGID\",\"customerAccountName\":\"Cust $SFX\",\"customerDomain\":\"cust$SFX.sa\",\"opportunityId\":\"OPP-$SFX\",\"estimatedDealValue\":100000}")
CID=$(echo "$CL" | jget claim.id)
assert "$(echo "$CL" | jget preflight)" "pass" "preflight"

V1=$(curl -s -X POST "$API/claims/$CID/eligibility" -H "$H" | jget eligibility.verdict)
assert "$V1" "not_eligible" "eligibility before"

curl -s -X POST "$API/claims/$CID/attribution" -H "$H" -H 'Content-Type: application/json' -d '{"decision":"accepted","creditPercentage":100}' >/dev/null
curl -s -X POST "$API/claims/$CID/revenue" -H "$H" -H 'Content-Type: application/json' -d '{"amount":120000,"status":"closed_won"}' >/dev/null
curl -s -X POST "$API/partners/$PID/readiness" -H "$H" -H 'Content-Type: application/json' -d '{"bankVerified":true,"taxVerified":true}' >/dev/null

E2=$(curl -s -X POST "$API/claims/$CID/eligibility" -H "$H")
assert "$(echo "$E2" | jget eligibility.verdict)" "eligible" "eligibility after"
assert "$(echo "$E2" | jget eligibility.estimated_net)" "11400.00" "net preview"

# Cross-tenant isolation: a second tenant must not see the first tenant's claims.
TOK2=$(curl -s -X POST "$API/auth/onboard" -H 'Content-Type: application/json' \
  -d "{\"tenantName\":\"Other $SFX\",\"slug\":\"other-$SFX\",\"email\":\"x$SFX@other.sa\",\"password\":\"Passw0rd!\",\"fullName\":\"Other\"}" | jget token)
N=$(curl -s "$API/claims" -H "Authorization: Bearer $TOK2" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).claims.length))')
assert "$N" "0" "cross-tenant isolation"

echo "SMOKE PASS: register -> human attribution -> revenue -> eligible preview (net 11400) -> isolation holds"
