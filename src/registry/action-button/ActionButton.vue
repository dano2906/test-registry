<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Spinner from "@/components/ui/spinner/Spinner.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useConfirmAction } from "@/registry/action-button/useConfirmAction";

type ActionResult = { ok: true } | { ok: false; message?: string };

type MaybePromise<T> = T | Promise<T>;

interface Props<T extends ActionResult = ActionResult> {
  action(): MaybePromise<T>;
  requireAreYouSure?: boolean;
  couldCloseAutomatically?: boolean;
  toastOptions?: {
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  };
  dialogOptions?: {
    cancelButtonText?: string;
    confirmButtonText?: string;
  };
}

const {
  action,
  requireAreYouSure = false,
  couldCloseAutomatically = true,
  toastOptions = {
    position: "bottom-right",
  },
  dialogOptions = {
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
} = defineProps<Props>();

const emit = defineEmits<{
  success: [ActionResult];
  error: [unknown];
}>();

const { isLoading, openDialog, onPrimaryClick, onConfirm, onCancel } =
  useConfirmAction(action, {
    requireAreYouSure,
    couldCloseAutomatically,
    toastOptions,
  });
</script>

<template>
  <Button @click="onPrimaryClick" :disabled="isLoading">
    <slot name="text" />
    <Spinner v-if="isLoading && !requireAreYouSure" />
    <slot name="icon" v-else />
  </Button>
  <Dialog v-model:open="openDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button @click="onCancel" variant="secondary" class="mr-2">
          {{ dialogOptions?.cancelButtonText ?? "Cancelar" }}
        </Button>
        <Button @click="onConfirm" variant="destructive" class="min-w-28">
          <Spinner v-if="isLoading" />
          <span v-else>{{
            dialogOptions?.confirmButtonText ?? "Confirmar"
          }}</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
