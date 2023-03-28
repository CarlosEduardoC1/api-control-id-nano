interface Config {
  localCacheTtl: number;
}

export const config: Config = {
  localCacheTtl: Number(process.env.LOCAL_CACHE_TTL as string),
};
