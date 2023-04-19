{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs std self;
in rec {
  default = chatwith;
  chatwith = nixpkgs.buildNpmPackage {
    pname = "chatwith";
    version = "0.1.3";

    src = std.incl self [
      "package.json"
      "package-lock.json"
      "tsconfig.json"
      "global.d.ts"
      "src"
    ];

    npmDepsHash = "sha256-MY7YbuB+o/4Bb4jJIWMTFD2OZi2sa/6csQK8H3mdSF0=";
  };
}
