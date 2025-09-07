import React from 'react';
import { Calendar, MessageCircle, Lock, Globe, MoreHorizontal, Heart, Share2 } from 'lucide-react';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onEdit?: (article: Article) => void;
  onDelete?: (articleId: string) => void;
  showActions?: boolean;
}

export function ArticleCard({ article, onEdit, onDelete, showActions = false }: ArticleCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={article.author.avatar}
            alt={article.author.fullName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{article.author.fullName}</h3>
            <p className="text-sm text-gray-500">@{article.author.username}</p>
          </div>
        </div>
        
        {showActions && (
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
        <p className="text-gray-700 line-clamp-3">{article.content}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            {article.isPublic ? (
              <>
                <Globe className="h-4 w-4" />
                <span>Public</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Privé</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
            <Heart className="h-5 w-5" />
            <span>0</span>
          </button>
          
          {article.allowComments && (
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>{article.comments.length}</span>
            </button>
          )}
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
            <Share2 className="h-5 w-5" />
            <span>Partager</span>
          </button>
        </div>

        {showActions && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit && onEdit(article)}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Modifier
            </button>
            <button
              onClick={() => onDelete && onDelete(article.id)}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}