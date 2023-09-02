import configs from "configs";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";

export async function verifyAccessToken(
  accessToken: string
): Promise<JWTPayload> {
  const { payload } = await jwtVerify(
    accessToken,
    new TextEncoder().encode(configs.jwt.accessTokenSecret)
  );
  return payload;
}

export async function verifyRefreshToken(
  refreshToken: string
): Promise<JWTPayload> {
  const { payload }: any = await jwtVerify(
    refreshToken,
    new TextEncoder().encode(configs.jwt.refreshTokenSecret)
  );
  return payload;
}

export async function signAccessToken(payload: JWTPayload): Promise<string> {
  const secretKey = new TextEncoder().encode(configs.jwt.accessTokenSecret);
  const alg = "HS256";
  const newAccessToken = await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(configs.jwt.accessTokenExpireIn)
    .setIssuedAt()
    .sign(secretKey);
  return newAccessToken;
}

export async function refreshAccessToken(refreshToken: string) {
  const payload: any = await verifyRefreshToken(refreshToken);
  const newAccessToken = await signAccessToken({
    userID: payload.userID,
    role: payload.role,
  });
  return newAccessToken;
}
