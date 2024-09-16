export interface BuildOptions {
  paths: BuildPaths;
  mode?: BuildMode;
  port?: number;
}

export interface BuildPaths {
  entry: string;
  output: string;
  src: string;
  public: string;
}

export type BuildMode = 'development' | 'production';