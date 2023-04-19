{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs std self;
in rec {
  default = chatwith;
  chatwith = nixpkgs.buildNpmPackage {
    pname = "chatwith";
    version = "0.1.2";

    src = std.incl self [
      "package.json"
      "package-lock.json"
      "tsconfig.json"
      "global.d.ts"
      "src"
    ];

    npmDepsHash = "sha256-TumJWW5uHZIm2q7ijHHINZ4e26Sz0qnkYJCGwDTcvU0=";
  };
}
