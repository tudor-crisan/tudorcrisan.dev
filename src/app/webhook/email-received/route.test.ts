
import { POST } from './route';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

// Mock Resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'mock-id' }),
      },
    })),
  };
});

// Mock NextRequest and NextResponse
// This is a simplified test for the logic inside POST

describe('Webhook Loop Prevention', () => {
  let mockResendSend: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockResendSend = (new Resend() as any).emails.send;
  });

  it('should skip forwarding if from address is the target email', async () => {
    const payload = {
      type: 'email.received',
      data: {
        from: 'tudor.crisan.webdev@gmail.com',
        subject: 'Test loop',
      },
    };
    const req = new NextRequest('http://localhost/api/webhook', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'svix-id': '123',
        'svix-timestamp': '123',
        'svix-signature': 'v1,mock-sig',
      },
    });

    // Note: Signature verification will fail unless mocked
    // For simplicity, I'll mock verifySignature in the route or the crypto calls
  });
});
