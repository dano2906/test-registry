<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import ActionButton from "@/registry/action-button/components/ActionButton.vue";
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";

const actionError = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ok: false, message: "Something went wrong" };
};

const actionSuccess = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ok: true };
};
</script>

<template>
  <div
    class="py-4 mx-auto max-w-5xl flex flex-wrap items-center justify-center gap-0.5"
  >
    <ActionButton :action="actionError" require-are-you-sure>
      <template #text>With Dialog with Error</template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
    <ActionButton :action="actionError">
      <template #text>Without Dialog with Error</template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
    <ActionButton :action="actionSuccess">
      <template #text>Without Dialog without Error</template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
    <ActionButton :action="actionSuccess" require-are-you-sure>
      <template #text>With Dialog without Error</template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>

    <Toaster rich-colors />
  </div>
</template>
