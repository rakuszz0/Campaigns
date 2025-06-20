import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import NavbarWithoutSearch from "../components/Navbar";
import { useEffect } from "react";
import { API } from "../config/api";
import { useQuery } from "@tanstack/react-query"; // Updated import
import { formatRupiah } from "../utils/currencyFormat";

function HomeOwner() {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Updated query syntax
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await API.get("/campaigns");
      return response.data.data;
    }
  });

  // Updated query syntax
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await API.get("/transactions");
      return response.data.data;
    }
  });

  // Rest of your component remains the same...
  const campaignData = campaigns?.map(campaign => {
    const campaignTransactions = transactions?.filter(
      transaction => transaction.campaign_id === campaign.id
    );
    
    const totalCollected = campaignTransactions?.reduce(
      (sum, transaction) => sum + (transaction.status_payment === "success" ? transaction.amount : 0),
      0
    );

    const donors = campaignTransactions?.map(transaction => ({
      name: transaction.user?.fullname,
      amount: transaction.amount,
      date: transaction.created_at
    }));

    return {
      ...campaign,
      totalCollected,
      donors,
      donorCount: campaignTransactions?.length || 0
    };
  });

  return (
    <>
      <NavbarWithoutSearch />
      <Container style={{ marginTop: "120px", marginBottom: "50px" }}>
        <h1 className="mb-4">Campaign Management</h1>
        
        <Table striped bordered hover responsive>
          <thead className="bg-light">
            <tr>
              <th>No</th>
              <th>Campaign Name</th>
              <th>Type</th>
              <th>Target Amount</th>
              <th>Collected</th>
              <th>Donors</th>
              <th>Status</th>
              <th>Related Parties</th>
            </tr>
          </thead>
          <tbody>
            {campaignData?.map((campaign, index) => (
              <tr key={campaign.id}>
                <td>{index + 1}</td>
                <td>{campaign.title}</td>
                <td>{campaign.type}</td>
                <td>{formatRupiah(campaign.target_amount)}</td>
                <td>
                  {formatRupiah(campaign.totalCollected || 0)} 
                  <div className="progress mt-2" style={{ height: "8px" }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ 
                        width: `${Math.min(100, (campaign.totalCollected / campaign.target_amount) * 100)}%` 
                      }} 
                    />
                  </div>
                </td>
                <td>
                  {campaign.donorCount} donors
                  <ul className="list-unstyled mt-2 small">
                    {campaign.donors?.slice(0, 3).map((donor, i) => (
                      <li key={i}>
                        {donor.name} ({formatRupiah(donor.amount)})
                      </li>
                    ))}
                    {campaign.donorCount > 3 && (
                      <li className="text-muted">+{campaign.donorCount - 3} more</li>
                    )}
                  </ul>
                </td>
                <td>
                  <span className={`badge ${
                    campaign.status === 'active' ? 'bg-success' : 
                    campaign.status === 'completed' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td>
                  {campaign.organizer || "AmaiSAS Team"}
                  {campaign.beneficiary && (
                    <div className="small text-muted">For: {campaign.beneficiary}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default HomeOwner;