/// <reference types="node" />
/**
 * @internal
 */
export declare type FileOrBuffer = File | Buffer | BufferOrStringWithName;
/**
 * @internal
 */
export declare type BufferOrStringWithName = {
    data: Buffer | string;
    name: string;
};
/**
 * @internal
 */
export declare type FileOrBufferOrString = FileOrBuffer | string;
//# sourceMappingURL=data.d.ts.map