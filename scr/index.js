
import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

const server = new McpServer({
  name: "Poster Campaign Assistant",
  version: "1.0.0",
});

server.registerTool(
  "create_campaign_copy",
  {
    description:
      "Creates concise promotional copy for a poster or social media campaign.",
    inputSchema: {
      business: z.string().describe("Business or organization name"),
      event: z.string().describe("Event, service, or promotion"),
      date: z.string().optional().describe("Date if applicable"),
      location: z.string().optional().describe("Location if applicable"),
      audience: z.string().optional().describe("Target audience"),
      tone: z.string().optional().describe("Desired tone"),
    },
  },
  async ({ business, event, date, location, audience, tone }) => {
    const copy = [
      `BUSINESS: ${business}`,
      `MAIN MESSAGE: ${event}`,
      date ? `DATE: ${date}` : "",
      location ? `LOCATION: ${location}` : "",
      audience ? `AUDIENCE: ${audience}` : "",
      tone ? `TONE: ${tone}` : "",
      "",
      "Create a strong headline, short supporting message, call-to-action, and social-media caption using the information above.",
    ]
      .filter(Boolean)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: copy,
        },
      ],
    };
  }
);

export default {
  fetch: createMcpHandler(server),
};
