import fetch from 'node-fetch';

type Params = {[_: string]: string | undefined};

export default class APIRequest {
    static readonly API_KEY: string = process.env.CTA_API_KEY;
    static readonly API_ROOT: string = process.env.API_ROOT;
    path: string;
    params: Params;
    static readonly default_params: Params = {
        outputType: "JSON"
    };

    constructor(path: string, params: Params) {
        this.path = path;
        this.params = params;
    }

    async execute(): Promise<APIResponse> {
        const res = await fetch(this.render_url());
        const res_obj = await res.json();

        return res_obj as APIResponse;
    }

    private render_url(): string {
        const params_with_auth: Params = {
            ...this.params,
            ...APIRequest.default_params,
            key: APIRequest.API_KEY
        };

        const entries = Object.entries(params_with_auth).map(([key, value]) => `${key}=${value}`);
        return `${APIRequest.API_ROOT}${this.path}?${entries.join('&')}`;
    }
}

export interface APIResponse {
    ctatt: {
        tmst: string,
        errCd: string,
        errNm: string | null,
        eta: [{
            staId: string,
            stpId: string,
            staNm: string,
            stpDe: string,
            rn: string,
            rt: string,
            destSt: string,
            destNm: string,
            trDr: string,
            prdt: string,
            arrT: string,
            isApp: string,
            isSch: string,
            isDly: string,
            isFlt: string,
            flags: string | null,
            lat: string,
            lon: string,
            heading: string
        }]
    }
}
