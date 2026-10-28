<script setup>
import { computed, inject, watch, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from "@/api"
import { useStore } from "@/store"

const store = useStore()

const router = useRouter()

async function test() {
    const c = await api.wallet.metamask.contractTokenFactoryV2("0xefc166e8ffe493AD85BE95Cee4a13f2B3CaaD0e5")


    console.log(await c.getOwnRecords(store.walletAddress, 0, 5))
    // console.log(await c.deployers(0))
    // console.log(await c.deployers(1))
    // console.log(await c.deployers(2))
    // console.log(await c.deployers(3))
    // console.log(await c.deployers(4))
    // console.log(await c.deployers(5))
    // console.log(await c.deployers(6))
}
</script>
<template>
    <button @click="test">Test</button>
</template>

<style lang="scss"></style>
<style scoped lang='scss'></style>