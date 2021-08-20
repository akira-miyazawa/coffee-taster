declare module 'vue2-google-maps' {
  import Vue, { PluginFunction } from 'vue';

  export const install: PluginFunction<{}>;

  export type googleMaps = typeof google.maps;
}