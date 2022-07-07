import { render } from "solid-js/web";
import { onMount } from "solid-js";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import * as symbolUtils from "@arcgis/core/symbols/support/symbolUtils";

function MyMap() {
  let mapRef;

  onMount(() => {
    const layer = new FeatureLayer({
      portalItem: {
        id: "f9e348953b3848ec8b69964d5bceae02"
      },
      outFields: ["SEASON"]
    });

    const map = new ArcGISMap({
      basemap: "gray-vector",
      layers: [layer]
    });

    const view = new MapView({
      map,
      container: mapRef,
      center: [-98, 40],
      zoom: 4
    });

    view.on("click", async (event) => {
      const { results } = await view.hitTest(event, { include: layer });
      const graphic = (results[0] as any).graphic;

      // do something with the result color
      const color = await symbolUtils.getDisplayedColor(graphic);
      console.log(color);
    });
  });

  return <div class="viewDiv" ref={mapRef}></div>;
}

render(() => <MyMap />, document.getElementById("app")!);
