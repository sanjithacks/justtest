import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export interface HCaptchaSiteVerifyRequest {
  secret: string;
  response: string;
  remoteip?: string;
}

export interface HCaptchaSiteVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

const siteVerifyUrl = "https://hcaptcha.com/siteverify";

export const verifyHCaptcha = async ({
  secret,
  response,
  remoteip,
}: HCaptchaSiteVerifyRequest) => {
  const params: Record<string, string> = remoteip
    ? {
        secret,
        response,
        remoteip,
      }
    : { secret, response };
  const data = new URLSearchParams(params);

  const result = await fetch(siteVerifyUrl, {
    method: "POST",
  });
};

const router = new Router();
router.get("/", async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

router.post("/verify", (context) => {
  try {
    console.log(context.request);
  } catch {
    console.log("lmao");
  }
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("server started 8000");

app.listen("0.0.0.0:8000");
