import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  PersonBadgeFill,
  GenderAmbiguous,
  TelephoneFill,
  GeoAltFill,
  PersonCircle
} from "react-bootstrap-icons";

// import NavbarWithoutSearch from "../components/NavbarWithoutSearch";
import ChangePassword from "../components/ChangePassword";
import ChangeImageModal from "../components/ChangeImage";

import { UserContext } from "../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { API } from "../config/api";

export default function Profile() {
  const [state] = useContext(UserContext);
  const id = state.user.id;

  const [showChangeImage, setShowChangeImage] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Set background color on mount
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
    return () => {
      document.body.style.background = ""; // Reset when component unmounts
    };
  }, []);

  // Fresh user data
  const { data: userProfile } = useQuery(
    ["userProfileCache", id],
    async () => {
      const res = await API.get(`/user/${id}`);
      return res.data.data;
    },
    { enabled: !!id } // only run if id exists
  );

  return (
    <>
      {/* <NavbarWithoutSearch /> */}

      <Container className="my-4">
        <Row className="bg-white p-5 rounded shadow justify-content-between">
          {/* LEFT SIDE */}
          <Col sm={5} className="d-flex flex-column gap-4">
            <h3 className="fw-bold">Personal Info</h3>

            <InfoItem icon={<PersonFill size={40} />} label="Full Name" value={state.user.fullname} />
            <InfoItem icon={<EnvelopeFill size={40} />} label="Email" value={state.user.email} />

            <InfoItem
              icon={<LockFill size={40} />}
              label="Password"
              value={
                <Button
                  variant="link"
                  className="p-0 fw-bold text-primary"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </Button>
              }
            />
            <ChangePassword show={showChangePassword} onHide={() => setShowChangePassword(false)} />

            <InfoItem icon={<PersonBadgeFill size={40} />} label="Status" value={state.user.list_as_role} />
            <InfoItem icon={<GenderAmbiguous size={40} />} label="Gender" value={state.user.gender} />
            <InfoItem icon={<TelephoneFill size={40} />} label="Phone" value={state.user.phone} />
            <InfoItem icon={<GeoAltFill size={40} />} label="Address" value={state.user.address} />
          </Col>

          {/* RIGHT SIDE */}
          <Col sm={5} className="d-flex flex-column gap-3 align-items-center">
            {userProfile?.image ? (
              <img
                className="shadow rounded"
                style={{ width: "300px", height: "430px", objectFit: "cover" }}
                src={userProfile?.image}
                alt="Profile"
              />
            ) : (
              <PersonCircle size={200} className="text-secondary" />
            )}

            <Button
              variant="primary"
              onClick={() => setShowChangeImage(true)}
              className="w-100 mt-3"
            >
              Change Profile Photo
            </Button>

            <ChangeImageModal show={showChangeImage} onHide={() => setShowChangeImage(false)} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

// 🔑 Reusable InfoItem component
const InfoItem = ({ icon, label, value }) => (
  <div className="d-flex align-items-center gap-3">
    <div>{icon}</div>
    <div className="d-flex flex-column">
      {typeof value === "string" ? (
        <>
          <span className="fw-semibold">{value}</span>
          <span className="fs-6 text-secondary">{label}</span>
        </>
      ) : (
        <>
          {value}
          <span className="fs-6 text-secondary">{label}</span>
        </>
      )}
    </div>
  </div>
);
