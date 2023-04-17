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

		npmDepsHash = "sha256-dERBU0vnuQf2+gZej7OLtC6phD9Lnkv80oHmFoqgXDI=";
	};
}
