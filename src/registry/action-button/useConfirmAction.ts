import { ref } from "vue";
import { toast } from "vue-sonner";

export type ActionResult = { ok: true } | { ok: false; message?: string };

type MaybePromise<T> = T | Promise<T>;

interface UseConfirmActionOptions {
  requireAreYouSure?: boolean;
  couldCloseAutomatically?: boolean;
  toastOptions?: {
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  };
}

export function useConfirmAction<T extends ActionResult>(
  action: () => MaybePromise<T>,
  {
    requireAreYouSure = false,
    couldCloseAutomatically = true,
    toastOptions = {
      position: "bottom-right",
    },
  }: UseConfirmActionOptions = {}
) {
  const isLoading = ref(false);
  const openDialog = ref(false);

  const showError = (message = "Something went wrong") => {
    toast.error(message, { position: toastOptions.position });
  };

  const execute = async () => {
    isLoading.value = true;

    try {
      const result = await action();

      if (!result.ok) {
        showError(result.message);
        return;
      }
      if (openDialog.value && couldCloseAutomatically) {
        openDialog.value = false;
      }

      return result;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      showError(message);
    } finally {
      isLoading.value = false;
    }
  };

  const onPrimaryClick = () => {
    if (requireAreYouSure) {
      openDialog.value = true;
    } else {
      execute();
    }
  };

  const onConfirm = () => {
    execute();
  };

  const onCancel = () => {
    openDialog.value = false;
  };

  return {
    isLoading,
    openDialog,
    onPrimaryClick,
    onConfirm,
    onCancel,
  };
}
