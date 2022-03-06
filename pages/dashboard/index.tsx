import PageTitle from "@components/PageTitle"

const Dashboard = ({}) => {
  return (
    <>
      <PageTitle
        title="User Dashboard"
        description="User information and settings."
        banner={false}
      />

      <div className="p-8">User Dashboard</div>
    </>
  )
}

export default Dashboard
