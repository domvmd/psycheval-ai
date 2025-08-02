# PsychEval AI - Claude Code Instructions

This file contains project-specific instructions for Claude Code when working on the PsychEval AI codebase.

## Project Overview

PsychEval AI is a SAAS platform for psychiatrists and clinical psychologists that records patient interviews, transcribes them using OpenAI Whisper, and generates standards-compliant psychiatric evaluations using Claude Sonnet 4 API.

## Agent OS Documentation

### Product Context
- **Mission & Vision:** @.agent-os/product/mission.md
- **Technical Architecture:** @.agent-os/product/tech-stack.md
- **Development Roadmap:** @.agent-os/product/roadmap.md
- **Decision History:** @.agent-os/product/decisions.md

### Development Standards
- **Code Style:** @~/.agent-os/standards/code-style.md
- **Best Practices:** @~/.agent-os/standards/best-practices.md

### Project Management
- **Active Specs:** @.agent-os/specs/
- **Spec Planning:** Use `@~/.agent-os/instructions/create-spec.md`
- **Tasks Execution:** Use `@~/.agent-os/instructions/execute-tasks.md`

## Workflow Instructions

When asked to work on this codebase:

1. **First**, check @.agent-os/product/roadmap.md for current priorities
2. **Then**, follow the appropriate instruction file:
   - For new features: @.agent-os/instructions/create-spec.md
   - For tasks execution: @.agent-os/instructions/execute-tasks.md
3. **Always**, adhere to the standards in the files listed above

## Important Notes

- Product-specific files in `.agent-os/product/` override any global standards
- User's specific instructions override (or amend) instructions found in `.agent-os/specs/...`
- Always adhere to established patterns, code style, and best practices documented above.

## Project-Specific Guidelines

### Psychiatric Evaluation Standards
- **Critical**: All generated evaluations MUST follow the standards in @docs/psychEvalStandards.md
- Use patient-centered language and recovery-oriented approach
- Maintain clinical objectivity with empathy
- Document substance use without judgment
- Emphasize patient strengths and coping mechanisms

### Audio Handling
- Use Web Audio API for browser-based recording
- Store temporary files locally before uploading to Supabase
- Support multiple audio formats for Whisper compatibility
- Implement proper error handling for microphone permissions

### Multi-Language Support
- Primary language is English
- Must support Filipino, Spanish, and other languages
- Use OpenAI Whisper for transcription
- Ensure UI supports internationalization

### Security & Compliance
- HIPAA compliance is mandatory
- All patient data must be encrypted
- Implement audit trails for all actions
- Use Supabase Row Level Security (RLS)
- Never log sensitive patient information

### AI Integration
- OpenAI Whisper for transcription
- Claude Sonnet 4 for evaluation generation
- Implement proper error handling for API failures
- Cache responses when appropriate
- Monitor API usage for cost control