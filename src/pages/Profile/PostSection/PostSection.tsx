import React, { FC } from "react";
import {Post} from "./Post/Post";

export const PostSection: FC = () => {
    return (
        <section className="postSection">
            <Post />
        </section>
    )
}
