<script lang="ts">
export default {
  props: {
    size: {
      type: Number,
      default: 1
    }
  }
}
</script>

<template>
<g>
  <defs>
    <radialGradient id="starGradient">
      <stop offset="20%" stop-color="#c3b3da"/>
      <stop offset="75%" stop-color="#d4c4eb"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </radialGradient>
    <radialGradient id="glowingGradient">
      <stop offset="0%" stop-color="#ffffff"  stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ffffff"  stop-opacity="0.0"/>
    </radialGradient>
  </defs>
  <g :transform="'scale(' + (size * 2 + 0.5) + ')'">

    <circle cx="0" cy="0" r="24" stroke-width="0" fill="url(#glowingGradient)"  pointer-events="none"/>
    <circle cx="0" cy="0" r="13" stroke="#ffffff" stroke-width="0.15" fill="url(#starGradient)" />
    <circle cx="0" cy="0" r="14" stroke="#ffffff" stroke-width="0" fill="#ffffff00" />


  </g>
</g>
</template>
