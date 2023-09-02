import configs from "configs";
import md5 from "md5";

const getRandomNonce = (num: number) =>
    Math.floor(
        (Math.random() + Math.floor(Math.random() * 9 + 1)) *
        Math.pow(10, num - 1)
    );

const secret = configs.requestBodySignSecret

export const genSign = (body: any) => {
    const serverTime = Date.now();
    const nonce = getRandomNonce(20);

    body.e = serverTime;
    body.n = nonce;
    body.secret = secret;
    body.v = "v1";

    const sortKeys = [];

    for (const key in body) {
        if (key !== "sign") {
            sortKeys.push(key);
        }
    }
    sortKeys.sort();

    let bodyHolder = "";

    sortKeys.forEach((key) => {
        bodyHolder += key + body[key];
    });

    body.sign = md5(bodyHolder).toString();

    delete body.secret;
    return body;
};
