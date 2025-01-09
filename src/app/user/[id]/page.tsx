import Layout from "@/layout";
import { fetchUserById } from "@/api/api";
import { User } from "@/types/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UserPageProps {
  params: { id: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  let user: User | null = null;

  try {
    user = await fetchUserById(id);
  } catch (error) {
    console.error("Error fetching user:", error);
    return (
      <Layout showHomeButton={true}>
        <div className="text-center text-red-500 mt-10 text-lg">
          Failed to load user. Please try again later.
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout showHomeButton={true}>
        <div className="text-center text-red-500 mt-10 text-lg">User not found.</div>
      </Layout>
    );
  }

  return (
    <Layout showHomeButton={true}>
      <div className="page-container card-animation">
        {!user ? (
          <Card className="card-default">
            <CardHeader>
              <Skeleton className="skeleton-header" />
            </CardHeader>
            <CardContent>
              <Skeleton className="skeleton-item skeleton-three-quarters" />
              <Skeleton className="skeleton-item skeleton-two-thirds" />
              <Skeleton className="skeleton-item skeleton-three-quarters" />
              <Skeleton className="skeleton-item skeleton-half-width" />
            </CardContent>
          </Card>
        ) : (
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="card-title">{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="info-list">
                <li>
                  <strong className="info-item">Username:</strong> {user.username}
                </li>
                <li>
                  <strong className="info-item">Email:</strong> {user.email}
                </li>
                <li>
                  <strong className="info-item">Address:</strong> {user.address.street}, {user.address.city}
                </li>
                <li>
                  <strong className="info-item">Phone:</strong> {user.phone}
                </li>
                <li>
                  <strong className="info-item">Website:</strong> {user.website}</li>
                <li>
                  <strong className="info-item">Company:</strong> {user.company.name}
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
