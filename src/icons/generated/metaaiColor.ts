import { IconDefinition } from '../../types';

/**
 * MetaaiColor icon definition
 */
export const metaaiColor: IconDefinition = {
  "name": "metaaiColor",
  "viewBox": "0 0 24 24",
  "content": [
    {
      "tag": "title",
      "attrs": {},
      "children": "MetaAI"
    },
    {
      "tag": "g",
      "attrs": {
        "clipPath": "url(#lobe-icons-meta-ai-fill-0)",
        "filter": "url(#lobe-icons-meta-ai-fill-1)"
      },
      "children": [
        {
          "tag": "path",
          "attrs": {
            "clipRule": "evenodd",
            "d": "M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 3.627a8.373 8.373 0 100 16.746 8.373 8.373 0 000-16.746z",
            "fill": "url(#lobe-icons-meta-ai-fill-2)",
            "fillRule": "evenodd"
          },
          "children": []
        }
      ]
    },
    {
      "tag": "defs",
      "attrs": {},
      "children": [
        {
          "tag": "linearGradient",
          "attrs": {
            "gradientUnits": "userSpaceOnUse",
            "id": "lobe-icons-meta-ai-fill-2",
            "x1": "24",
            "x2": "0",
            "y1": "0",
            "y2": "24"
          },
          "children": [
            {
              "tag": "stop",
              "attrs": {
                "offset": ".13",
                "stopColor": "#FF97E3"
              },
              "children": []
            },
            {
              "tag": "stop",
              "attrs": {
                "offset": ".18",
                "stopColor": "#D14FE1"
              },
              "children": []
            },
            {
              "tag": "stop",
              "attrs": {
                "offset": ".338",
                "stopColor": "#0050E2"
              },
              "children": []
            },
            {
              "tag": "stop",
              "attrs": {
                "offset": ".666",
                "stopColor": "#0050E2"
              },
              "children": []
            },
            {
              "tag": "stop",
              "attrs": {
                "offset": ".809",
                "stopColor": "#00DDF4"
              },
              "children": []
            },
            {
              "tag": "stop",
              "attrs": {
                "offset": ".858",
                "stopColor": "#23F8CC"
              },
              "children": []
            }
          ]
        },
        {
          "tag": "clipPath",
          "attrs": {
            "id": "lobe-icons-meta-ai-fill-0"
          },
          "children": [
            {
              "tag": "path",
              "attrs": {
                "d": "M0 0h24v24H0z",
                "fill": "#fff"
              },
              "children": []
            }
          ]
        },
        {
          "tag": "filter",
          "attrs": {
            "colorInterpolationFilters": "sRGB",
            "filterUnits": "userSpaceOnUse",
            "height": "24",
            "id": "lobe-icons-meta-ai-fill-1",
            "width": "24",
            "x": "0",
            "y": "0"
          },
          "children": [
            {
              "tag": "feFlood",
              "attrs": {
                "floodOpacity": "0",
                "result": "BackgroundImageFix"
              },
              "children": []
            },
            {
              "tag": "feBlend",
              "attrs": {
                "in": "SourceGraphic",
                "in2": "BackgroundImageFix",
                "result": "shape"
              },
              "children": []
            },
            {
              "tag": "feColorMatrix",
              "attrs": {
                "in": "SourceAlpha",
                "result": "hardAlpha",
                "values": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              },
              "children": []
            },
            {
              "tag": "feOffset",
              "attrs": {},
              "children": []
            },
            {
              "tag": "feGaussianBlur",
              "attrs": {
                "stdDeviation": ".75"
              },
              "children": []
            },
            {
              "tag": "feComposite",
              "attrs": {
                "in2": "hardAlpha",
                "k2": "-1",
                "k3": "1",
                "operator": "arithmetic"
              },
              "children": []
            },
            {
              "tag": "feColorMatrix",
              "attrs": {
                "values": "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
              },
              "children": []
            },
            {
              "tag": "feBlend",
              "attrs": {
                "in2": "shape",
                "result": "effect1_innerShadow_674_237"
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
};
