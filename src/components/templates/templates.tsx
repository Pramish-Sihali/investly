import type { Document } from '@/types/document';

import React from 'react';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import HeadingSection from '@/components/common/heading-section';
import {
  File,
  FileText,
  Download,
  Calendar,
  FileImage,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
} from 'lucide-react';

const fetchDocuments = async (): Promise<Document[]> => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          documents {
            id
            order
            file
            createdAt
            updatedAt
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
      return <FileText className="w-8 h-8 text-blue-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return <FileImage className="w-8 h-8 text-green-500" />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <FileSpreadsheet className="w-8 h-8 text-emerald-500" />;
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
      return <FileVideo className="w-8 h-8 text-purple-500" />;
    case 'mp3':
    case 'wav':
    case 'aac':
      return <FileAudio className="w-8 h-8 text-orange-500" />;
    default:
      return <File className="w-8 h-8 text-gray-500" />;
  }
};

const getFileName = (filePath: string): string => filePath.split('/').pop() || filePath;

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Templates = async () => {
  const documents: Document[] = await fetchDocuments();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <HeadingSection badge="Templates" title="Document Templates" />

      <div className="mt-12">
        {documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">There are no documents available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => {
              const fileName = getFileName(document.file);
              const fileExtension = fileName.split('.').pop()?.toUpperCase() || '';

              return (
                <div
                  key={document.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{getFileIcon(fileName)}</div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">
                        {fileName}
                      </h3>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {fileExtension}
                        </span>

                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>
                            {new Date(document.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL}${document.file}`}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
