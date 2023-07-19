
import toast from "react-hot-toast";

export function handleApiError(error: Error): void {
  try {
    let errorData;
    try {
      errorData = JSON.parse(error.message);
    } catch (parseError) {
      toast.error(error.message);
      return;
    }

    if (
      typeof errorData === "object" &&
      errorData !== null &&
      "fieldErrors" in errorData
    ) {
      const fieldErrors = errorData.fieldErrors as Record<string, string[]>;
      Object.keys(fieldErrors).forEach((fieldName) => {
        const validationMessages = fieldErrors[fieldName];
        if (validationMessages.length > 0) {
          const firstValidationMessage = validationMessages[0];
          toast.error(firstValidationMessage);
        }
      });
    }
  } catch (error: any) {
    toast.error(error);
  }
}
