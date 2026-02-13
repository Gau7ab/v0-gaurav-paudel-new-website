-- Create tool_usage table to track when users use tools
CREATE TABLE IF NOT EXISTS tool_usage (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_key TEXT NOT NULL,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_accessed_at ON tool_usage(accessed_at DESC);

-- Enable RLS
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;

-- Users can only see their own tool usage
CREATE POLICY "Users can view their own tool usage"
  ON tool_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own tool usage
CREATE POLICY "Users can create their own tool usage"
  ON tool_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
