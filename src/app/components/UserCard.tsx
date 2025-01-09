import Link from "next/link";
import { User } from "@/types/user";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UserCardProps {
  user?: User;
  isLoading?: boolean;
}

export const UserCard = ({ user, isLoading }: UserCardProps) => (
  <Card className="user-card-default">
    {isLoading ? (
      <>
        <CardHeader className="user-card-header">
          <Skeleton className="user-skeleton-header" />
        </CardHeader>
        <CardContent className="user-card-content">
          <Skeleton className="user-skeleton-content" />
          <Skeleton className="user-skeleton-content-small" />
        </CardContent>
        <CardFooter className="user-card-footer">
          <Skeleton className="user-skeleton-button" />
        </CardFooter>
      </>
    ) : (
      <>
        <CardHeader className="user-card-header">
          <CardTitle className="user-card-title">{user?.name}</CardTitle>
        </CardHeader>
        <CardContent className="user-card-content">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Company:</strong> {user?.company.name}
          </p>
        </CardContent>
        <CardFooter className="user-card-footer">
          <Link href={`/user/${user?.id}`}>
            <button className="user-card-button">View More</button>
          </Link>
        </CardFooter>
      </>
    )}
  </Card>
);
