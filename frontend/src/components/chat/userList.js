import React from "react";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
} from "@mui/material";

export default function UserList(props) {
    // props.users = list of usernames who had sent/received messages
    return (
        <List>
            {props.users.map((user) => {
                return (
                    <ListItemButton key={user} onClick={props.func(user)}>
                        <ListItemIcon>
                            <Avatar alt={user} />
                        </ListItemIcon>
                        <ListItemText primary={user}>{user}</ListItemText>
                    </ListItemButton>
                );
            })}
        </List>
    );
}
