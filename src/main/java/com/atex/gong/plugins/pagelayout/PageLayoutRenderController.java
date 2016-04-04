package com.atex.gong.plugins.pagelayout;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.polopoly.cm.ContentId;
import com.polopoly.cm.ContentReference;
import com.polopoly.model.Model;
import com.polopoly.render.RenderRequest;
import com.polopoly.siteengine.dispatcher.ControllerContext;
import com.polopoly.siteengine.model.TopModel;
import com.polopoly.siteengine.mvc.RenderControllerBase;

public class PageLayoutRenderController extends RenderControllerBase {

    private static final Logger LOGGER = Logger.getLogger(PageLayoutRenderController.class.getName());

    @Override
    public void populateModelBeforeCacheKey(final RenderRequest request,
                                            final TopModel topModel,
                                            final ControllerContext context) {
        List<Model> pagePath = new ArrayList<Model>();
        for (ContentId pathId : topModel.getContext().getPage().getContentPath()) {
            try {
                pagePath.add(context.getModelProvider().getModel(pathId));
            } catch (Exception e) {
                LOGGER.log(Level.WARNING, "Error getting model", e);
            }
        }
        topModel.getLocal().setChild("pagePath", pagePath);
        List<Model> topPages = new ArrayList<Model>();
        ListIterator<ContentReference> iterator =
                topModel.getContext().getSite().getBean().getSubPages().getListIterator();
        while (iterator.hasNext()) {
            ContentReference ref = iterator.next();
            try {
                topPages.add(context.getModelProvider().getModel(ref.getReferredContentId()));
            } catch (Exception e) {
                LOGGER.log(Level.WARNING, "Error getting model", e);
            }
        }
        topModel.getLocal().setChild("topPages", topPages);
    }
}
