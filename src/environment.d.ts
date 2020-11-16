declare namespace NodeJS {
  export interface ProcessEnv {
    CTA_API_KEY: string,
    MYSQL_HOST: string | undefined,
    MYSQL_PORT: string | undefined,
    MYSQL_USERNAME: string | undefined,
    MYSQL_PASSWORD: string | undefined,
    MYSQL_DATABASE: string,
    API_ROOT: string,
    CTA_STATION: string
  }
}