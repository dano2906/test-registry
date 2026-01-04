<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import ActionButton from "@/registry/action-button/ActionButton.vue";
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import Snippet from "@/components/partials/Snippet.vue";

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
    <section class="space-y-2">
      <h2
        class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        Action Button
      </h2>
      <Snippet
        code="pnpm dlx shadcn-vue@latest add https://test-registry-beta.vercel.app/r/action-button.json"
      />
      <div class="flex flex-wrap items-center justify-center gap-0.5">
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
      </div>
    </section>
    <Toaster rich-colors />
  </div>
</template>
