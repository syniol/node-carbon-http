export interface CarbonError extends Error {
    code?: number;
}
export declare function NewCarbonError(msg: string, stack?: string, code?: number): Readonly<CarbonError>;
//# sourceMappingURL=error.d.ts.map