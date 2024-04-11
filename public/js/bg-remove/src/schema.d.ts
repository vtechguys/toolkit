export { Config, ConfigSchema, validateConfig };
import { z } from 'zod';
declare const ConfigSchema: z.ZodDefault<z.ZodObject<{
    publicPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, string, string>;
    debug: z.ZodDefault<z.ZodBoolean>;
    proxyToWorker: z.ZodDefault<z.ZodBoolean>;
    fetchArgs: z.ZodDefault<z.ZodAny>;
    progress: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodString, z.ZodNumber, z.ZodNumber], z.ZodUnknown>, z.ZodVoid>>;
    model: z.ZodDefault<z.ZodEnum<["small", "medium"]>>;
    output: z.ZodDefault<z.ZodObject<{
        format: z.ZodDefault<z.ZodEnum<["image/png", "image/jpeg", "image/webp", "image/x-rgba8", "image/x-alpha8"]>>;
        quality: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
        quality?: number;
    }, {
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
        quality?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    publicPath?: string;
    debug?: boolean;
    proxyToWorker?: boolean;
    fetchArgs?: any;
    progress?: (args_0: string, args_1: number, args_2: number, ...args_3: unknown[]) => void;
    model?: "small" | "medium";
    output?: {
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
        quality?: number;
    };
}, {
    publicPath?: string;
    debug?: boolean;
    proxyToWorker?: boolean;
    fetchArgs?: any;
    progress?: (args_0: string, args_1: number, args_2: number, ...args_3: unknown[]) => void;
    model?: "small" | "medium";
    output?: {
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
        quality?: number;
    };
}>>;
type Config = z.infer<typeof ConfigSchema>;
declare function validateConfig(configuration?: Config): Config;
//# sourceMappingURL=schema.d.ts.map