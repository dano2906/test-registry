<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-vue-next";
import { toast } from "vue-sonner";
const { code } = defineProps<{
  code: string;
}>();
const copied = ref(false);
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code);
    copied.value = true;
    toast.success("Copiado!", {
      position: "top-right",
    });
    setTimeout(() => {
      copied.value = false;
    }, 1000);
  } catch (err) {
    console.error("Error copiando el código", err);
  }
};
</script>

<template>
  <div class="relative w-full max-w-sm md:max-w-5xl">
    <pre
      class="bg-gray-500 text-slate-100 rounded overflow-x-auto p-2"
    ><code>{{ code }}</code></pre>

    <Button
      @click="copyCode"
      variant="secondary"
      size="icon-sm"
      class="absolute right-2 -top-1.5 bg-gray-950/70 hover:bg-gray-950/80 text-slate-100"
    >
      <Copy v-if="!copied" />
      <CopyCheck v-else />
    </Button>
  </div>
</template>
