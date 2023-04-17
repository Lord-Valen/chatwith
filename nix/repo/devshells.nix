{
  inputs,
  cell,
}: let
  inherit (inputs) std;
  lib = inputs.nixpkgs.lib // builtins;
  presets = inputs.std-data-collection.data.configs;
in
  lib.mapAttrs (_: std.lib.dev.mkShell) {
    default = {
      name = "chatwith";
			commands = [
        {package = inputs.nixpkgs.prefetch-npm-deps;}
        {
          name = "upd";
          help = "Update packages and prefetch deps.";
          command = ''npm update && prefetch-npm-deps "$PRJ_ROOT"/package-lock.json'';
        }
        {
          name = "dev";
          help = "Run the program and watch for changes. For lazy people.";
          command = ''npm run dev'';
        }
      ];
      nixago = with cell.configs; [
        editorconfig
        presets.conform
        presets.treefmt
      ];
    };
  }
