import { USERINFO } from "../Main/AccountApprovalManagement"
import CommentShow from "./CommentShow"

export type CommentType = {
    id: number,
    content: string,
    blogCategoryId: number,
    userId: string,
    parentId: number | null,
    createdAt: string,
    updatedAt?: string,
    likes: number,
    dislikes: number,
    comments: number,
    parent?: {
        user: {
            firstName: string,
            lastName: string,
            userName: string,
        }
    },
    user: USERINFO
}

interface CommentListProps {
    comments: CommentType[]
}

export default async function CommentList({comments}: CommentListProps) {

    // The first comments
    const topLevelComments = comments.filter(
        (comment) => comment.parentId === null
    );

    const renderedComments = topLevelComments.map((comment) => {
        return (
        <CommentShow
            key={comment.id}
            commentId={comment.id}
            comments={comments}
        />
        );
    });

    return (
        <div className="my-10">
            {renderedComments}
        </div>
    );
}