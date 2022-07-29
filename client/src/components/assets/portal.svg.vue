<script lang="ts">
export default {
  props: {
    size: {
      type: Number,
      default: 1
    },
    rotation: {
      type: Number,
      default: 0
    }
  }
}
</script>

<template>
<g>
  <defs>
    <radialGradient id="portalGradient">
      <stop offset="0%" stop-color="#c3b3da" stop-opacity="1"/>
      <stop offset="40%" stop-color="#280b4b" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="darkeningGradient">
      <stop offset="0%" stop-color="#c3b3da"  stop-opacity="0"/>
      <stop offset="80%" stop-color="#000000"  stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#280b4b"  stop-opacity="0.0"/>
    </radialGradient>
    <linearGradient id="darklineGradient">
      <stop offset="0%" stop-color="#000000"  stop-opacity="0.0"/>
      <stop offset="50%" stop-color="#280b4b"  stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#000000"  stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <g :transform="'scale(' + (size * 1.5 + 0.25) + ')'">

    <circle cx="0" cy="0" r="16" stroke="#c3b3da" stroke-opacity="0.3" stroke-width="0.25" fill="url(#portalGradient)" />
    <circle cx="0" cy="0" r="24" stroke-width="0" fill="url(#darkeningGradient)"  pointer-events="none"/>

    <g>
      <path
        v-for="n in 10"
        :transform="'rotate(' + (n * 36) + ')'"
        d="M 2 2 Q 7 -15 7 -5"
        stroke="url(#darklineGradient)"
        stroke-width="10"
        stroke-opacity="1"
        fill="none"
        />
      <animateTransform attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="360"
                        to="0"
                        dur="30s"
                        animate="freeze"
                        repeatCount="indefinite"/>
    </g>
    <g>
      <path
        v-for="n in 6"
        :transform="'rotate(' + ((n * 60)) + ')'"
        d="M 2 2 Q 7 -12 5 -2"
        stroke="url(#darklineGradient)"
        stroke-width="10"
        stroke-opacity="1"
        fill="none"
        />
      <animateTransform attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="360"
                        to="0"
                        dur="120s"
                        animate="freeze"
                        repeatCount="indefinite"/>
    </g>
  </g>
</g>
</template>

