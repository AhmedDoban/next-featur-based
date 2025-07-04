"use client";
import Swal from "sweetalert2";
import "./DeleteButton.css";

function DeleteButton({
  children,
  className,
  title = "Are you sure?",
  extraTitle = "",
  text = "This will be deleted permanently.",
  icon = "error",
  showCancelButton = true,
}) {
  const HandleDelete = () => {
    Swal.fire({
      title: title,
      text: `${text} ${extraTitle}`,
      icon: icon,
      showCancelButton: showCancelButton,
      confirmButtonText: "Yes, delete!",
      customClass: {
        popup: "custom-popup",
        confirmButton: "custom-confirm-button",
        container: "custom-container",
        htmlContainer: "custom-html-container",
        actions: "custom-actions",
        cancelButton: "custom-cancel-button",
        icon: "custom-icon",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `The ${extraTitle} has been deleted.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-popup",
            container: "custom-container",
            htmlContainer: "custom-html-container",
          },
        });
      }
    });
  };

  return (
    <button onClick={HandleDelete} className={className}>
      {children}
    </button>
  );
}
export default DeleteButton;
