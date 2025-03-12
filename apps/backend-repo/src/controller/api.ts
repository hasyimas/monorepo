import { Request, Response } from "express";
import { fetchUser, updateUser } from "../repository/userCollection";
import { User } from "shared";

export const fetchUserData = async (
  req: Request,
  res: Response
): Promise<User | any> => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  const user = await fetchUser(token);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  const user = req.body;
  await updateUser(user);
  res.json({ message: "User updated successfully" });
};
