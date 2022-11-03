import React from "react";
import "../../purchaseManager/printPOs/invoice.css";
import {
  DeleteOutline,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  EditOutlined,
  CancelOutlined,
  CheckOutlined,
  EditTwoTone,
} from "@material-ui/icons";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function Table({ list }) {
  const userType = useSelector((state) => state.user.userType);
  console.log({list});

  const editQuantity = async () => {
    Swal.fire({
      title: "Enter new Quantity",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#378cbb",
      showLoaderOnConfirm: true,
      inputPlaceholder: "Maximum Level",
      inputValidator: (value) => {
        if (!value) {
          return "You need to add something!";
        }
      },
      preConfirm: (maxQuantity) => {
        // return updateProduct(id, { maxQuantity: maxQuantity }, dispatch);
        return true;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Updated!", "Quantity has been updated.", "success");
        // setDeleteTrigger("maximum" + deleteTrigger);
      } else {
        Swal.fire("Updated fail!", "Quantity has not been updated.", "error");
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteConfirm(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    // setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="row gutters">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="table-responsive">
          <table
            className="table custom-table m-0"
            style={{
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                {!(
                  userType == "ROLE_WAREHOUSE_MANAGER" ||
                  userType == "ROLE_SITE_MANAGER"
                ) && <th>Unit Price</th>}
                <th>Quantity</th>
                {!(
                  userType == "ROLE_WAREHOUSE_MANAGER" ||
                  userType == "ROLE_SITE_MANAGER"
                ) && <th>Sub Total</th>}
                {!(
                  userType == "ROLE_PURCHASING_STAFF" ||
                  userType == "ROLE_PURCHASING_MANAGER"
                ) && <th>Action</th>}
              </tr>
            </thead>
            {list.map(
              ({ id, desc, productName, itemCode, rate, quantity, amount }) => (
                <React.Fragment key={id}>
                  <tbody>
                    <tr>
                      <td>{itemCode}</td>
                      <td>{productName}</td>
                      {!(
                        userType == "ROLE_WAREHOUSE_MANAGER" ||
                        userType == "ROLE_SITE_MANAGER"
                      ) && (
                        <td>
                          {rate}{" "}
                          {!(
                            userType == "ROLE_PURCHASING_STAFF" ||
                            userType == "ROLE_PURCHASING_MANAGER"
                          ) && (
                            <EditOutlined
                              className="productListDelete"
                              style={{ color: "green", marginRight: 10 }}
                              onClick={() => {
                                editQuantity(id);
                              }}
                            />
                          )}
                        </td>
                      )}
                      <td>{quantity}</td>
                      {!(
                        userType == "ROLE_WAREHOUSE_MANAGER" ||
                        userType == "ROLE_SITE_MANAGER"
                      ) && <td>{rate * quantity}</td>}
                      {!(
                        userType == "ROLE_PURCHASING_STAFF" ||
                        userType == "ROLE_PURCHASING_MANAGER"
                      ) && (
                        <td>
                          <DeleteOutline
                            className="productListDelete"
                            onClick={() => {
                              handleDelete(id);
                            }}
                          />
                        </td>
                      )}
                    </tr>
                  </tbody>
                </React.Fragment>
              )
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
