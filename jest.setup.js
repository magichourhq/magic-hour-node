const { Readable } = require('stream');

// Mock the entire fs module
jest.mock('fs', () => {
  // Preserve the original module
  const originalModule = jest.requireActual('fs');

  // Create a mock readable stream factory
  const createMockReadStream = (content = 'mock file content') => {
    return new Readable({
      read() {
        this.push(Buffer.from(content));
        this.push(null); // signals end of stream
      }
    });
  };

  return {
    ...originalModule,
    createReadStream: jest.fn().mockImplementation((path) => {
      const mockStream = createMockReadStream();

      mockStream.bytesRead = 0;
      mockStream.path = path;
      mockStream.pending = false;

      return mockStream;
    })
  };
});