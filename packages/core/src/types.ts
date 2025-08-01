/**
 * Basic type definitions for VoltAgent Core
 */

import type { SpanExporter } from "@opentelemetry/sdk-trace-base";
import type { Agent } from "./agent/agent";
import type { CustomEndpointDefinition } from "./server/custom-endpoints";
import type { VoltAgentExporter } from "./telemetry/exporter";
import type { VoltOpsClient } from "./voltops";
import type { Workflow } from "./workflow/types";
import type { WorkflowChain } from "./workflow/chain";
import type { DangerouslyAllowAny } from "@voltagent/internal/types";
import type { Logger } from "@voltagent/internal";

// Re-export VoltOps types for convenience
export type {
  PromptReference,
  PromptHelper,
  PromptContent,
  CachedPrompt,
  ChatMessage,
  DynamicValue,
  DynamicValueOptions,
  PromptApiClient,
  PromptApiResponse,
  VoltOpsClientOptions,
  VoltOpsPromptManager,
} from "./voltops/types";

/**
 * Server configuration options for VoltAgent
 */
export type ServerOptions = {
  /**
   * Whether to automatically start the server
   * @default true
   */
  autoStart?: boolean;
  /**
   * Port number for the server
   * @default 3141 (or next available port)
   */
  port?: number;
  /**
   * Optional flag to enable/disable Swagger UI
   * By default:
   * - In development (NODE_ENV !== 'production'): Swagger UI is enabled
   * - In production (NODE_ENV === 'production'): Swagger UI is disabled
   */
  enableSwaggerUI?: boolean;
  /**
   * Optional array of custom endpoint definitions to register with the API server
   */
  customEndpoints?: CustomEndpointDefinition[];
};

/**
 * VoltAgent constructor options
 */
export type VoltAgentOptions = {
  agents: Record<string, Agent<any>>;
  /**
   * Optional workflows to register with VoltAgent
   * Can be either Workflow instances or WorkflowChain instances
   */
  workflows?: Record<
    string,
    | Workflow<DangerouslyAllowAny, DangerouslyAllowAny, DangerouslyAllowAny, DangerouslyAllowAny>
    | WorkflowChain<
        DangerouslyAllowAny,
        DangerouslyAllowAny,
        DangerouslyAllowAny,
        DangerouslyAllowAny,
        DangerouslyAllowAny
      >
  >;
  /**
   * Server configuration options
   */
  server?: ServerOptions;

  /**
   * Unified VoltOps client for telemetry and prompt management
   * Replaces the old telemetryExporter approach with a comprehensive solution.
   */
  voltOpsClient?: VoltOpsClient;

  /**
   * Global logger instance to use across all agents and workflows
   * If not provided, a default logger will be created
   */
  logger?: Logger;

  /**
   * @deprecated Use `voltOpsClient` instead. Will be removed in a future version.
   * Optional OpenTelemetry SpanExporter instance or array of instances.
   * or a VoltAgentExporter instance or array of instances.
   * If provided, VoltAgent will attempt to initialize and register
   * a NodeTracerProvider with a BatchSpanProcessor for the given exporter(s).
   * It's recommended to only provide this in one VoltAgent instance per application process.
   */
  telemetryExporter?: (SpanExporter | VoltAgentExporter) | (SpanExporter | VoltAgentExporter)[];

  /**
   * @deprecated Use `server.port` instead
   */
  port?: number;
  /**
   * @deprecated Use `server.autoStart` instead
   */
  autoStart?: boolean;
  checkDependencies?: boolean;
  /**
   * @deprecated Use `server.customEndpoints` instead
   */
  customEndpoints?: CustomEndpointDefinition[];
  /**
   * @deprecated Use `server.enableSwaggerUI` instead
   */
  enableSwaggerUI?: boolean;
};
