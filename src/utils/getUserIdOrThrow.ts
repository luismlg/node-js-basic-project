import { FastifyRequest, FastifyReply } from "fastify";

export function getUserIdOrThrow(
  request: FastifyRequest,
  reply: FastifyReply
): number | undefined {
  const user = request.user as { userId?: number };

  if (!user?.userId) {
    reply.status(401).send({ error: "Unauthorized" });
    return;
  }

  return user.userId;
}
