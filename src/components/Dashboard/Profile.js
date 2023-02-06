import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Navbar from "../Navbar";
import Spinner from "react-bootstrap/Spinner";
import { url } from "../../App";
import "../../App.css";
import { RecipeState } from "../../context/RecipesProvider";

export default function Profile() {
  const token = sessionStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile, getProfile } = RecipeState();

  // console.log(profile);

  const handleSubmit = async () => {
    // console.log(userName);
    setLoading(true);
    const update = await axios.put(
      `${url}/updateProfile`,
      {
        userName,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    // console.log(update);
    if (update.data.statusCode === 200) {
      alert("Profile updated successfully");
      setUserName("");
      setNameEdit(false);
      getProfile();
    } else {
      alert(update.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setUserName(profile.userName);
    getProfile();
    // eslint-disable-next-line
  }, [profile?.userName]);

  // console.log(profile);

  if (!token) return <div> Please Login...</div>;

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center my-5">Profile</h1>
        <div className="card mb-3 profile-wrapper col-md-6 align-items-center">
          <Table bordered striped hover>
            <tbody>
              <tr className="" style={{ height: "50px" }}>
                <td>UserName</td>
                <td>
                  {nameEdit ? (
                    <>
                      <input
                        type="text"
                        name="userName"
                        value={userName}
                        placeholder="Enter new Username"
                        className="border-0 me-4"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="25"
                        fill="currentColor"
                        className="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                        onClick={() => setNameEdit(false)}
                        style={{ cursor: "pointer" }}
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    </>
                  ) : (
                    <>{profile.userName}</>
                  )}
                </td>
              </tr>
              <tr style={{ height: "50px" }}>
                <td>Email</td>
                <td>{profile.email}</td>
              </tr>
              <tr style={{ height: "50px" }}>
                <td>Password</td>
                <td>*******</td>
              </tr>
            </tbody>
          </Table>

          {nameEdit ? (
            <button
              className="btn btn-warning mt-1 mb-3"
              onClick={() => handleSubmit()}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Update Profile"
              )}
            </button>
          ) : (
            <button
              className="btn btn-primary w-25 mt-1 mb-3"
              onClick={() => setNameEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </>
  );
}