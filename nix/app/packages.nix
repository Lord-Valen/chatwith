{
  inputs,
  cell,
}: let
	inherit (inputs) nixpkgs std self;
in rec {
  default = chatwith;
  chatwith = nixpkgs.buildNpmPackage {
		pname = "chatwith";
		version = "0.1.1";

		src = std.incl self [
			"package.json"
			"package-lock.json"
			"tsconfig.json"
			"global.d.ts"
			"src"
		];

		npmDepsHash = "sha256-mralf3y0oma+1R2gWqgDi/ZXw7wDXDgfTPzFWyLNNHs=";
	};
}
