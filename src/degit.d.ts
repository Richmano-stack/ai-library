declare module 'degit' {
  interface DegitOptions {
    cache?: boolean;
    force?: boolean;
    verbose?: boolean;
  }

  interface DegitEmitter {
    clone(dest: string): Promise<void>;
  }

  function degit(repo: string, options?: DegitOptions): DegitEmitter;

  export default degit;
}
